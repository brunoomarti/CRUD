package com.brunoicaro.DTO;

import com.brunoicaro.model.Dependente;
import com.brunoicaro.model.Socio;

public record DependenteResponseDTO (
	Socio socio
) {
	public DependenteResponseDTO(Dependente dependente){
        this(
			dependente.getSocio()
        );
    }
}