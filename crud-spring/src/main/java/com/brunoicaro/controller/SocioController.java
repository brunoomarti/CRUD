package com.brunoicaro.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
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

import com.brunoicaro.DTO.SocioRequestDTO;
import com.brunoicaro.DTO.SocioResponseDTO;
import com.brunoicaro.model.Socio;
import com.brunoicaro.service.SocioService;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;


@RestController
@RequestMapping("/api/socio")
public class SocioController {
    
    private final SocioService socioService;

    SocioController(SocioService socioService) {
        this.socioService = socioService;
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping
    public @ResponseBody List<SocioResponseDTO> getAll(){
        return socioService.getAll();
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    @Transactional
    public Socio save(@RequestBody @Valid SocioRequestDTO data){
        return socioService.save(data);
    }

    @GetMapping("/{id}")
    public SocioResponseDTO findById(@PathVariable @NotNull @Positive Long id){
        return socioService.findById(id);
    }

    @PutMapping("/{id}")
    public Socio update(@PathVariable @NotNull @Positive Long id, @RequestBody Socio socio){
        return socioService.update(id ,socio);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void delete(@PathVariable @NotNull @Positive Long id){
        socioService.delete(id);
    }

}
