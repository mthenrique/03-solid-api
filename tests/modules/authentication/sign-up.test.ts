import SignUpService from "@/modules/authentication/services/sign-up-service"
import UserRepositoryInMemory from "tests/in-memory-repositories/user-repository-in-memory"
import { it, expect, describe, vi } from "vitest"
import { compare } from 'bcryptjs'
import { UserAlreadyExistsError } from "@/modules/authentication/infra/errors/user-already-exists-error"
import { ExceptionError } from "@/infra/errors/exception-error"

describe("SignUp", () => {
  it ("should be able to hash a password", async () => {
    const userRepositoryInMemory = new UserRepositoryInMemory()
    
    const  signUpService = new SignUpService(userRepositoryInMemory)

    const newUser = {
      name: "John Doe",
      email: "z5nQs@example.com",
      password: "12345678"
    }

    await signUpService.execute(newUser)

    const userWithPassword = await userRepositoryInMemory.findByEmailWithPassword(newUser.email)
    console.log('USER: ', userWithPassword)

    if (!userWithPassword) {
      throw new Error('User not found')
    }

    const isPasswordEqual = await compare(newUser.password, userWithPassword.passwordHash)

    expect(isPasswordEqual).toBe(true)
  })

  it ("should be able to create a new user", async () => {
    const userRepositoryInMemory = new UserRepositoryInMemory()
    
    const  signUpService = new SignUpService(userRepositoryInMemory)

    const userData = {
      name: "John Doe",
      email: "z5nQs@example.com",
      password: "12345678"
    }

    await signUpService.execute(userData)

    const user = await userRepositoryInMemory.findByEmailWithPassword(userData.email)

    expect(user).toBeTruthy()
    expect(user?.name).toEqual(userData.name)
    expect(user?.email).toEqual(userData.email)
    expect(await compare(userData.password, user?.passwordHash ?? '')).toBeTruthy()
  })

  it ("should not be able to create a new user with an existing email", async () => {
    const userRepositoryInMemory = new UserRepositoryInMemory()
    
    const  signUpService = new SignUpService(userRepositoryInMemory)

    const newUser = {
      name: "John Doe",
      email: "z5nQs@example.com",
      password: "12345678"
    }

    await signUpService.execute(newUser)

    await expect(signUpService.execute(newUser)).rejects.toThrowError(UserAlreadyExistsError)
  })

  it("should throw ExceptionError if there's an unexpected error", async () => {
    const userRepositoryInMemory = new UserRepositoryInMemory();

    // Simulamos um erro inesperado no método `findByEmail`
    vi.spyOn(userRepositoryInMemory, 'findByEmail').mockImplementationOnce(() => {
      throw new Error("Unexpected error");
    });

    const signUpService = new SignUpService(userRepositoryInMemory);

    const newUser = {
      name: "John Doe",
      email: "z5nQs@example.com",
      password: "12345678",
    };

    // Verificamos se o SignUpService lança a ExceptionError quando ocorre um erro inesperado
    await expect(signUpService.execute(newUser)).rejects.toThrowError(ExceptionError);

    // Restaurar o comportamento original após o teste
    vi.restoreAllMocks();
  });
})
