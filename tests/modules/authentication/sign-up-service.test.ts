import SignUpService from "@/modules/authentication/services/sign-up-service"
import { it, expect, describe, vi, beforeEach } from "vitest"
import { compare } from 'bcrypt'
import { UserAlreadyExistsError } from "@/modules/authentication/infra/errors/user-already-exists-error"
import { ExceptionError } from "@/infra/errors/exception-error"
import UsersRepositoryInMemory from "tests/in-memory-repositories/users-repository-in-memory"


let usersRepositoryInMemory: UsersRepositoryInMemory
let signUpService: SignUpService

describe("SignUp", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    signUpService = new SignUpService(usersRepositoryInMemory)
  })

  it ("should be able to hash a password", async () => {
    const newUser = {
      name: "John Doe",
      email: "z5nQs@example.com",
      password: "12345678"
    }

    await signUpService.execute(newUser)

    const userWithPassword = await usersRepositoryInMemory.findByEmailWithPassword(newUser.email)
    console.log('USER: ', userWithPassword)

    if (!userWithPassword) {
      throw new Error('User not found')
    }

    const isPasswordEqual = await compare(newUser.password, userWithPassword.passwordHash)

    expect(isPasswordEqual).toBe(true)
  })

  it ("should be able to create a new user", async () => {
    const userData = {
      name: "John Doe",
      email: "z5nQs@example.com",
      password: "12345678"
    }

    await signUpService.execute(userData)

    const user = await usersRepositoryInMemory.findByEmailWithPassword(userData.email)

    expect(user).toBeTruthy()
    expect(user?.name).toEqual(userData.name)
    expect(user?.email).toEqual(userData.email)
    expect(await compare(userData.password, user?.passwordHash ?? '')).toBeTruthy()
  })

  it ("should not be able to create a new user with an existing email", async () => {
    const newUser = {
      name: "John Doe",
      email: "z5nQs@example.com",
      password: "12345678"
    }

    await signUpService.execute(newUser)

    await expect(signUpService.execute(newUser)).rejects.toThrowError(UserAlreadyExistsError)
  })

  it("should throw ExceptionError if there's an unexpected error", async () => {
    vi.spyOn(usersRepositoryInMemory, 'findByEmail').mockImplementationOnce(() => {
      throw new Error("Unexpected error");
    });

    const signUpService = new SignUpService(usersRepositoryInMemory);

    const newUser = {
      name: "John Doe",
      email: "z5nQs@example.com",
      password: "12345678",
    };

    await expect(signUpService.execute(newUser)).rejects.toThrowError(ExceptionError);

    vi.restoreAllMocks();
  });
})
