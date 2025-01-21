package com.jwt.server.service;

public interface DtoService<T> {

    T convertToDto(Object object);

}
