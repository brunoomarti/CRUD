package com.brunoicaro.DTO;

import com.brunoicaro.model.Classe;

public record ClasseResponseDTO(
    Long _id,
    String nome,
    int prazoDias,
    double valor
) {
    public ClasseResponseDTO(Classe classe){
        this(
            classe.getId(),
            classe.getNome(),
            classe.getPrazoDias(),
            classe.getValor()
        );
    }
    
}
