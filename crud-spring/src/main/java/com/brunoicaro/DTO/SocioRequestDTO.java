package com.brunoicaro.DTO;

import java.util.List;

import com.brunoicaro.model.Dependente;

public record SocioRequestDTO(
    int numero,
    String rua,
    String bairro,
    String cidade,
    String estado,
    String telefone,
    String cpf,
    List<Dependente> dependentes
) {
}