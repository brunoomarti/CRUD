package com.brunoicaro.DTO;

import com.brunoicaro.model.Ator;

public record AtorResponseDTO(Long _id, String nome) {
    public AtorResponseDTO(Ator ator){
        this(ator.getId(), ator.getNome());
    }
}
