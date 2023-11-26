package com.brunoicaro.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import com.brunoicaro.DTO.AtorRequestDTO;
import com.brunoicaro.DTO.AtorResponseDTO;
import com.brunoicaro.exception.ExclusaoComDependenciasException;
import com.brunoicaro.exception.RecordNotFoundException;
import com.brunoicaro.model.Ator;
import com.brunoicaro.model.Titulo;
import com.brunoicaro.repository.AtorRepository;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Service
public class AtorService {

    private final AtorRepository repository;

    public AtorService(AtorRepository repository){
        this.repository = repository;
    }

    public List<AtorResponseDTO> getAll() {
        return repository.findAll().stream().map((AtorResponseDTO::new)).toList();
    }
    
    public Ator findById(@PathVariable @NotNull @Positive Long id){
        return repository.findById(id).orElseThrow(() -> new RecordNotFoundException(id));
    }

    public Ator saveAtor(@Valid AtorRequestDTO data){
        Ator atorData = new Ator(data);
        System.out.println(data);
        return repository.save(atorData);
    }

    public Ator update(@NotNull @Positive Long id, @Valid Ator ator){
        return repository.findById(id)
                .map(recordFound -> {
                    recordFound.setNome(ator.getNome());
                    return repository.save(recordFound);
                }).orElseThrow(() -> new RecordNotFoundException(id));
    }

    public void delete(@PathVariable @NotNull @Positive Long id) {
        List<String> titulosDependentes = obterTitulosComDependencias(id);
        
        if (!titulosDependentes.isEmpty()) {
            throw new ExclusaoComDependenciasException(
                "Este registro possui dependências em outras entidades.<br/><br/>" +
                "Títulos dependentes: <br/>" +
                String.join("<br/>", titulosDependentes)
            );
        } else {
            repository.delete(repository.findById(id)
                    .orElseThrow(() -> new RecordNotFoundException(id)));
        }
    }

    private List<String> obterTitulosComDependencias(Long id) {
        Ator ator = repository.findById(id)
                .orElseThrow(() -> new RecordNotFoundException(id));

        List<String> titulosComDependencias = ator.getTitulos().stream()
                .map(Titulo::getNome)
                .collect(Collectors.toList());

        return titulosComDependencias;
    }

}
