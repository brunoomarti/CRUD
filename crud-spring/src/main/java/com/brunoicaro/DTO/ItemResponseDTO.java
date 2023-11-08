package com.brunoicaro.DTO;

import java.sql.Date;

import com.brunoicaro.model.Item;
import com.brunoicaro.model.Titulo;

public record ItemResponseDTO(
    Long id,
    Titulo titulo,
    Date dataAquisicao,
    String tipo
) {
    public ItemResponseDTO(Item item){
        this(
            item.getId(),
            item.getTitulo(),
            (Date) item.getDataAquisicao(),
            item.getTipo()
        );
    }
}
