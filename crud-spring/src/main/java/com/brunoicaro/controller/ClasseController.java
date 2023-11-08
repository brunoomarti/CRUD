package com.brunoicaro.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.brunoicaro.model.Classe;
import com.brunoicaro.repository.ClasseRepository;

import java.util.List;

@Validated
@RestController
@RequestMapping("/api/classe")
public class ClasseController {

    private final ClasseRepository classeRepository;

    @GetMapping
    public List<Classe> list() {
        return classeRepository.findAll();
    }

    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public Classe create(@RequestBody Classe classe) {
        return classeRepository.save(classe);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Classe> findbyId(@PathVariable Long id) {
        return classeRepository.findById(id)
                .map(registro -> ResponseEntity.ok().body(registro))
                .orElse(ResponseEntity.notFound().build());

    }

    @PutMapping("/{id}")
    public ResponseEntity<Classe> update(@PathVariable Long id, @RequestBody Classe classe){
        return classeRepository.findById(id)
                .map(registro -> {
                    registro.setNome(classe.getNome());
                    registro.setPrazoDias(classe.getPrazoDias());
                    registro.setValor(classe.getValor());
                    Classe updated = classeRepository.save(registro);
                    return ResponseEntity.ok().body(updated);
                        })
                .orElse(ResponseEntity.notFound().build());

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        return classeRepository.findById(id)
                .map(registro -> {
                    classeRepository.deleteById(id);
                    return ResponseEntity.noContent().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
