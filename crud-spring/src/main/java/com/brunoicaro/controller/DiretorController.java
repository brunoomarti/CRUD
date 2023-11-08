package com.brunoicaro.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.brunoicaro.model.Diretor;
import com.brunoicaro.repository.DiretorRepository;

import java.util.List;

@RestController
@RequestMapping("/api/diretor")
@AllArgsConstructor
public class DiretorController {

    private final DiretorRepository diretorRepository;

    @GetMapping
    public List<Diretor> list() {
        return diretorRepository.findAll();
    }

    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public Diretor create(@RequestBody Diretor ator) {
        return diretorRepository.save(ator);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Diretor> findbyId(@PathVariable Long id) {
        return diretorRepository.findById(id)
                .map(registro -> ResponseEntity.ok().body(registro))
                .orElse(ResponseEntity.notFound().build());

    }

    @PutMapping("/{id}")
    public ResponseEntity<Diretor> update(@PathVariable Long id, @RequestBody Diretor diretor){
        return diretorRepository.findById(id)
                .map(registro -> {
                    registro.setNome(diretor.getNome());
                    Diretor updated = diretorRepository.save(registro);
                    return ResponseEntity.ok().body(updated);
                        })
                .orElse(ResponseEntity.notFound().build());

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        return diretorRepository.findById(id)
                .map(registro -> {
                    diretorRepository.deleteById(id);
                    return ResponseEntity.noContent().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
