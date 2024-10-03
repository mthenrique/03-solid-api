import { describe, it, expect, beforeEach, vi } from 'vitest';
import { CheckInsRepository } from '@/infra/database/repositories/check-ins-repository';
import { ExceptionError } from '@/infra/errors/exception-error';
import GetUserMetricsService from '@/modules/user/services/get-user-metrics-service';
import CheckInsRepositoryInMemory from 'tests/in-memory-repositories/check-ins-repository-in-memory';

describe('GetUserMetricsService', () => {
  let checkInsRepository: CheckInsRepository;
  let getUserMetricsService: GetUserMetricsService;

  beforeEach(() => {
    checkInsRepository = new CheckInsRepositoryInMemory();
    getUserMetricsService = new GetUserMetricsService(checkInsRepository);
  });

  it('should return check-ins count for valid user ID', async () => {
    for(let i = 0; i < 5; i++) {
      await checkInsRepository.create({
        userId: `user-01`,
        gymId: `gym-01`
      })
    }

    const { checkInsCount } = await getUserMetricsService.execute({ userId: 'user-01' });

    expect(checkInsCount).toEqual(5);
  });

  it('should throw ExceptionError when unexpected error occurs', async () => {
    vi.spyOn(checkInsRepository, 'countByUserId').mockImplementationOnce(() => {
      throw new Error()
    });

    await expect(() => 
    getUserMetricsService.execute({ 
      userId: 'user-01' 
    })).rejects.toThrowError(ExceptionError);
  });
});