package com.brunoicaro.controller;

import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.brunoicaro.DTO.ClasseRequestDTO;
import com.brunoicaro.DTO.ClasseResponseDTO;
import com.brunoicaro.model.Classe;
import com.brunoicaro.service.ClasseService;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.util.List;

@Validated
@RestController
@RequestMapping("/api/classe")
public class ClasseController {

    private final ClasseService classeService;

    public ClasseController(ClasseService classeService){
        this.classeService = classeService;
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping
    public @ResponseBody List<ClasseResponseDTO> getAll(){
        return classeService.getAll();
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public Classe saveClasse(@RequestBody @Valid ClasseRequestDTO data){
        return classeService.saveClasse(data);
    }

    @GetMapping("/{id}")
    public ClasseResponseDTO findById(@PathVariable @NotNull @Positive Long id) {
        Classe classe = classeService.findById(id);
        if (classe != null) {
            return new ClasseResponseDTO(
                classe.getId(),
                classe.getNome(),
                classe.getPrazoDias(),
                classe.getValor()
            );
        } else {
            return null;
        }
    }

    @PutMapping("/{id}")
    public Classe update(@PathVariable @NotNull @Positive Long id, @RequestBody Classe classe){
        return classeService.update(id, classe);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void delete(@PathVariable @NotNull @Positive Long id){
        classeService.delete(id);
    }

}
