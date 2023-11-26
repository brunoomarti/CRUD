package com.brunoicaro.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import com.brunoicaro.DTO.ClasseRequestDTO;
import com.brunoicaro.DTO.ClasseResponseDTO;
import com.brunoicaro.exception.ExclusaoComDependenciasException;
import com.brunoicaro.exception.RecordNotFoundException;
import com.brunoicaro.model.Ator;
import com.brunoicaro.model.Classe;
import com.brunoicaro.model.Titulo;
import com.brunoicaro.repository.ClasseRepository;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Service
public class ClasseService {
    
    private final ClasseRepository repository;

    public ClasseService(ClasseRepository repository){
        this.repository = repository;
    }

    public List<ClasseResponseDTO> getAll() {
        return repository.findAll().stream().map((ClasseResponseDTO::new)).toList();
    }
    
    public Classe findById(@PathVariable @NotNull @Positive Long id){
        return repository.findById(id).orElseThrow(() -> new RecordNotFoundException(id));
    }

    public Classe saveClasse(@Valid ClasseRequestDTO data){
        Classe classeData = new Classe(data);
        System.out.println(data);
        return repository.save(classeData);
    }

    public Classe update(@NotNull @Positive Long id, @Valid Classe classe){
        return repository.findById(id)
                .map(recordFound -> {
                    recordFound.setNome(classe.getNome());
                    recordFound.setPrazoDias(classe.getPrazoDias());
                    recordFound.setValor(classe.getValor());
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
        Classe classe = repository.findById(id)
                .orElseThrow(() -> new RecordNotFoundException(id));

        List<String> titulosComDependencias = classe.getTitulos().stream()
                .map(Titulo::getNome)
                .collect(Collectors.toList());

        return titulosComDependencias;
    }
}
