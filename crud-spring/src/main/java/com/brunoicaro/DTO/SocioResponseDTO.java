package com.brunoicaro.DTO;

import java.sql.Date;
import java.util.List;

import com.brunoicaro.model.Dependente;
import com.brunoicaro.model.Socio;

import lombok.Data;

public record SocioResponseDTO(
    int numero,
    String rua,
    String bairro,
    String cidade,
    String estado,
    String telefone,
    String cpf,
    List<Dependente> dependentes
) {
    public SocioResponseDTO(Socio socio){
        this(
			socio.getNumero(),
			socio.getRua(),
			socio.getBairro(),
			socio.getCidade(),
			socio.getEstado(),
			socio.getTelefone(),
			socio.getCpf(),
			socio.getDependentes()
        );
    }
}