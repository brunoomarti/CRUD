package com.brunoicaro.service;

import java.sql.Date;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import com.brunoicaro.DTO.ItemResponseDTO;
import com.brunoicaro.exception.RecordNotFoundException;
import com.brunoicaro.model.Item;
import com.brunoicaro.model.Titulo;
import com.brunoicaro.repository.ItemRepository;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Service
public class ItemService {
    
    private final ItemRepository repository;

    public ItemService(ItemRepository repository){
        this.repository = repository;
    }

    public List<ItemResponseDTO> getAll() {
        return repository.findAll().stream().map((ItemResponseDTO::new)).toList();
    }

    public ItemResponseDTO findById(@PathVariable @NotNull @Positive Long id){
        return repository.findById(id).map((ItemResponseDTO::new)).orElseThrow(() -> new RecordNotFoundException(id));
    }

    @Transactional
    public Item saveItem(
            @RequestParam Long id,
            @RequestParam Titulo titulo,
            @RequestParam Date dataAquisicao,
            @RequestParam String tipo
    ) {
        Item itemData = new Item();
        itemData.setId(id);
        itemData.setTitulo(titulo);
        itemData.setDataAquisicao(dataAquisicao);
        itemData.setTipo(tipo);
        
        return repository.save(itemData);
    }

    public Item update(@NotNull @Positive Long id, @Valid Item item){
        return repository.findById(id)
                .map(recordFound -> {
                    recordFound.setId(item.getId());
                    recordFound.setTitulo(item.getTitulo());
                    recordFound.setDataAquisicao(item.getDataAquisicao());
                    recordFound.setTipo(item.getTipo());
                    return repository.save(recordFound);
                }).orElseThrow(() -> new RecordNotFoundException(id));
    }

    public void delete(@PathVariable @NotNull @Positive Long id){
        repository.delete(repository.findById(id)
                .orElseThrow(() -> new RecordNotFoundException(id)));
    }

}
