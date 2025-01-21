package com.jwt.server.service;

import com.jwt.server.data.Result;
import com.jwt.server.model.dto.UserDto;

public interface UserService extends DtoService<UserDto> {

    Result<Boolean> authenticate(String email, String password);

    void register(UserDto userDto);

    Result<UserDto> findById(Long id);

}
