package com.brunoicaro.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.brunoicaro.model.Diretor;

@Repository
public interface DiretorRepository extends JpaRepository<Diretor,Long>{
    
}
