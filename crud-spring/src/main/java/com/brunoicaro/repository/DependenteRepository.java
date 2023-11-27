package com.brunoicaro.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.brunoicaro.model.Dependente;

@Repository
public interface DependenteRepository extends JpaRepository<Dependente, Long> {
    
}
