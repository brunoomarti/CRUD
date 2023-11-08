package com.brunoicaro.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.brunoicaro.DTO.ItemRequestDTO;
import com.brunoicaro.DTO.ItemResponseDTO;
import com.brunoicaro.model.Item;
import com.brunoicaro.service.ItemService;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Validated
@RestController
@RequestMapping("/api/item")
public class ItemController {
    
    private final ItemService itemService;

    ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping
    public @ResponseBody List<ItemResponseDTO> getAll(){
        return itemService.getAll();
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    @Transactional
    public Item saveItem(@RequestBody @Valid ItemRequestDTO data){
        return itemService.saveItem(data.id(), data.titulo(), data.dataAquisicao(), data.tipo());
    }

    @GetMapping("/{id}")
    public ItemResponseDTO findById(@PathVariable @NotNull @Positive Long id){
        return itemService.findById(id);
    }

    @PutMapping("/{id}")
    public Item update(@PathVariable @NotNull @Positive Long id, @RequestBody Item item){
        return itemService.update(id ,item);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void delete(@PathVariable @NotNull @Positive Long id){
        itemService.delete(id);
    }

}
