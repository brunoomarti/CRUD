package com.brunoicaro.DTO;

public record ClasseRequestDTO(
    Long id,
    String nome,
    int prazoDias,
    double valor
) {
}
