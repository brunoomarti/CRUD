package com.brunoicaro.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import com.brunoicaro.DTO.ClienteRequestDTO;
import com.brunoicaro.DTO.DependenteRequestDTO;

@Data
@Table(name = "dependente")
@Entity(name = "dependente")
@SQLDelete(sql = "UPDATE Dependente SET status = 'Inativo' WHERE id = ? ")
@Where(clause = "status = 'Ativo'")
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Dependente extends Cliente {

    @ManyToOne
    @JoinColumn(name = "socio_id")
    private Socio socio;

    @NotNull
    @Pattern(regexp = "Ativo|Inativo")
    @Column(length = 10, nullable = false)
    private String status = "Ativo";

    public Dependente(DependenteRequestDTO data, ClienteRequestDTO dataCli) {
        super(new ClienteRequestDTO(
            dataCli._id(),
            dataCli.nome(),
            dataCli.sexo(),
            dataCli.dataNascimento()
        ));
        this.socio = data.socio();
    }
}
