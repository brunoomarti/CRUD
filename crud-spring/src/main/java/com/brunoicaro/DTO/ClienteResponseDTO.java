package com.brunoicaro.DTO;

import java.util.Date;

import com.brunoicaro.model.Cliente;

public record ClienteResponseDTO(
    Long _id,
    String nome,
    String sexo,
    Date dataNascimento
) {
    public ClienteResponseDTO(Cliente cliente) {
        this(
            cliente.getId(),
            cliente.getNome(),
            cliente.getSexo(),
            cliente.getDataNascimento()
        );
    }
}
