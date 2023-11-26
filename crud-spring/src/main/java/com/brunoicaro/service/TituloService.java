package com.brunoicaro.service;

import java.util.List;
import java.util.stream.Collectors;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import com.brunoicaro.DTO.TituloRequestDTO;
import com.brunoicaro.DTO.TituloResponseDTO;
import com.brunoicaro.exception.ExclusaoComDependenciasException;
import com.brunoicaro.exception.RecordNotFoundException;
import com.brunoicaro.model.Item;
import com.brunoicaro.model.Titulo;
import com.brunoicaro.repository.TituloRepository;

@Service
public class TituloService {
    
    private final TituloRepository repository;

    public TituloService(TituloRepository repository){
        this.repository = repository;
    }

    public List<TituloResponseDTO> getAll() {
        return repository.findAll().stream().map((TituloResponseDTO::new)).toList();
    }

    public TituloResponseDTO findById(@PathVariable @NotNull @Positive Long id){
        return repository.findById(id).map((TituloResponseDTO::new)).orElseThrow(() -> new RecordNotFoundException(id));
    }

    @Transactional
    public Titulo saveTitulo(@Valid TituloRequestDTO data){
        Titulo tituloData = new Titulo(data);
        System.out.println(data);
        return repository.save(tituloData);
    }

    public Titulo update(@NotNull @Positive Long id, @Valid Titulo titulo){
        return repository.findById(id)
                .map(recordFound -> {
                    recordFound.setNome(titulo.getNome());
                    recordFound.setAno(titulo.getAno());
                    recordFound.setCategoria(titulo.getCategoria());
                    recordFound.setSinopse(titulo.getSinopse());
                    recordFound.setAtores(titulo.getAtores());
                    recordFound.setDiretor(titulo.getDiretor());
                    recordFound.setClasse(titulo.getClasse());
                    return repository.save(recordFound);
                }).orElseThrow(() -> new RecordNotFoundException(id));
    }

        public void delete(@PathVariable @NotNull @Positive Long id) {
        List<String> itensDependentes = obterItensComDependencias(id);
        
        if (!itensDependentes.isEmpty()) {
            throw new ExclusaoComDependenciasException(
                "Este registro possui dependências em outras entidades.<br/><br/>" +
                "Itens dependentes: <br/>" +
                String.join("<br/>", itensDependentes)
            );
        } else {
            repository.delete(repository.findById(id)
                    .orElseThrow(() -> new RecordNotFoundException(id)));
        }
    }

    private List<String> obterItensComDependencias(Long id) {
        Titulo titulo = repository.findById(id)
                .orElseThrow(() -> new RecordNotFoundException(id));

        List<String> itensComDependencias = titulo.getItens().stream()
                .map(item -> "Id: " + item.getId() + ", Data de Aquisição: " + item.getDataAquisicao())
                .collect(Collectors.toList());

        return itensComDependencias;
    }
}
