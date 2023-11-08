package com.brunoicaro.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.brunoicaro.model.Titulo;

@Repository
public interface TituloRepository extends JpaRepository<Titulo, Long>{

}