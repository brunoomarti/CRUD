package com.brunoicaro.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.brunoicaro.model.Classe;

@Repository
public interface ClasseRepository extends JpaRepository<Classe,Long>{
    
}
