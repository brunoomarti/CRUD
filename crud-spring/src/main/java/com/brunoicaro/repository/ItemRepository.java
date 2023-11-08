package com.brunoicaro.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.brunoicaro.model.Item;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long>{
    
}
