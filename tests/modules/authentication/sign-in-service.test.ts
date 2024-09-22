import { describe, expect, it, vi } from 'vitest';
import { compare, hash } from 'bcrypt';
import { ExceptionError } from '@/infra/errors/exception-error';
import UserRepositoryInMemory from 'tests/in-memory-repositories/user-repository-in-memory';
import SignInService from '@/modules/authentication/services/sign-in-service';
import { InvalidCredentialError } from '@/modules/authentication/infra/errors/invalid-credential-error';

describe('SignInService', async () => {
  const userRepository = new UserRepositoryInMemory();
  const signInService = new SignInService(userRepository);

  it('should sign in successfully with valid credentials', async () => {
    const userData = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password'
    };

    const passwordHash = await hash('password', 6)

    await userRepository.create({
      name: userData.name,
      email: userData.email,
      passwordHash: passwordHash,
    });

    const result = await signInService.execute({ email: userData.email, password: userData.password });

    expect(result.user.email).toEqual(userData.email)
    expect(result.user.name).toEqual(userData.name)
  });

  it('should throw InvalidCredentialError with invalid email', async () => {
    await expect(signInService.execute({ email: 'invalid.email@example.com', password: 'password' })).rejects.toThrow(
      InvalidCredentialError,
    );
  });

  it('should throw InvalidCredentialError with invalid password', async () => {
    const userData = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password'
    };

    const passwordHash = await hash('password', 6)

    await userRepository.create({
      name: userData.name,
      email: userData.email,
      passwordHash: passwordHash,
    });

    await expect(signInService.execute({ email: userData.email, password: 'wrongPassword' })).rejects.toThrow(
      InvalidCredentialError,
    );
  });

  it('should throw ExceptionError with unknown error', async () => {
    vi.spyOn(userRepository, 'findByEmailWithPassword').mockRejectedValueOnce(new Error('Unknown error'));

    await expect(signInService.execute({ email: 'john.doe@example.com', password: 'password' })).rejects.toThrow(
      ExceptionError,
    );
  });
});