package com.StruckCroissant.GameDB.sevice;

import com.StruckCroissant.GameDB.dao.PageDao;
import org.springframework.beans.factory.annotation.Autowired;

public class PageService {

    private final PageDao pageDao;

    @Autowired
    public PageService(PageDao pageDao) {
        this.pageDao = pageDao;
    }


}
