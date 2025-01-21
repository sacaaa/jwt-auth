package com.jwt.server.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jwt.server.data.Result;
import com.jwt.server.model.User;
import com.jwt.server.model.dto.UserDto;
import com.jwt.server.repository.UserRepository;
import com.jwt.server.service.UserService;
import com.jwt.server.utils.Encrypt;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    private final ObjectMapper objectMapper;

    @Override
    public UserDto convertToDto(Object object) {
        if (object instanceof User) {
            return objectMapper.convertValue(object, UserDto.class);
        }
        throw new IllegalArgumentException("Object is not an instance of User");
    }

    @Override
    public Result<Boolean> authenticate(String email, String password) {
        var user = userRepository.findByEmail(email)
                .orElse(null);
        return Result.success(user != null
                && user.getPassword().equals(Encrypt.encryptSha256(Encrypt.encryptSha256(password))));
    }

    @Override
    public void register(UserDto userDto) {
        var user = objectMapper.convertValue(userDto, User.class);
        user.setPassword(Encrypt.encryptSha256(Encrypt.encryptSha256(user.getPassword())));
        userRepository.save(user);
    }

    @Override
    public Result<UserDto> findById(Long id) {
        var result = userRepository.findById(id);
        return result
                .map(this::convertToDto)
                .map(Result::success)
                .orElseGet(() -> Result.failure("User not found"));
    }

}
