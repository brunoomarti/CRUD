package com.brunoicaro.DTO;

import com.brunoicaro.model.Diretor;

public record DiretorResponseDTO(
    Long _id,
    String nome
) {
    public DiretorResponseDTO(Diretor diretor){
        this(
            diretor.getId(),
            diretor.getNome()
        );
    }   
}