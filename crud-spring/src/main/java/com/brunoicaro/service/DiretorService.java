package com.brunoicaro.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import com.brunoicaro.DTO.DiretorRequestDTO;
import com.brunoicaro.DTO.DiretorResponseDTO;
import com.brunoicaro.exception.ExclusaoComDependenciasException;
import com.brunoicaro.exception.RecordNotFoundException;
import com.brunoicaro.model.Classe;
import com.brunoicaro.model.Diretor;
import com.brunoicaro.model.Titulo;
import com.brunoicaro.repository.DiretorRepository;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Service
public class DiretorService {
    
    private final DiretorRepository repository;

    public DiretorService(DiretorRepository repository){
        this.repository = repository;
    }

    public List<DiretorResponseDTO> getAll() {
        return repository.findAll().stream().map((DiretorResponseDTO::new)).toList();
    }

    public Diretor findById(@PathVariable @NotNull @Positive Long id){
        return repository.findById(id).orElseThrow(() -> new RecordNotFoundException(id));
    }

    public Diretor saveDiretor(@Valid DiretorRequestDTO data){
        Diretor diretorData = new Diretor(data);
        System.out.println(data);
        return repository.save(diretorData);
    }

    public Diretor update(@NotNull @Positive Long id, @Valid Diretor diretor){
        return repository.findById(id)
                .map(recordFound -> {
                    recordFound.setNome(diretor.getNome());
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
        Diretor diretor = repository.findById(id)
                .orElseThrow(() -> new RecordNotFoundException(id));

        List<String> titulosComDependencias = diretor.getTitulos().stream()
                .map(Titulo::getNome)
                .collect(Collectors.toList());

        return titulosComDependencias;
    }
}
