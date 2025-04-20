package com.cmc.maintenance.repository;

import com.cmc.maintenance.model.ChecklistItem;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChecklistItemRepository extends JpaRepository<ChecklistItem, Long>{

    public List<ChecklistItem> findByAssetTypeId(Long assetTypeId);
}
