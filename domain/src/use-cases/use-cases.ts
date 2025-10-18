import {
  createBooking,
  listClassBookings,
  listUserBookings,
  updateBooking,
  getBookingById,
} from './booking';
import {
  createClass,
  getClassByLocation,
  getClassByStartDate,
  getClassByTeacher,
  getClassByTitle,
  getClassDetails,
  listAvailableClasses,
  updateClass,
} from './class';
import {
  createPayment,
  listBookingPayments,
  listUserPayments,
  updatePayment,
} from './payment';
import {
  deleteUser,
  getUserByEmail,
  listActiveUsers,
  listAllUsers,
  listStudents,
  login,
  register,
  updateUserData,
} from './user';

export type UseCase<P = any, D = any, R = unknown> = (
  deps: D,
  payload: P
) => Promise<R>;

export interface UseCaseDeclaration {
  useCase: UseCase;
  enable?: boolean;
}

export const domainUseCases = {
  register: {
    useCase: register,
    enable: true,
  },
  login: {
    useCase: login,
    enable: true,
  },
  updateUser: {
    useCase: updateUserData,
    enable: true,
  },
  getUserByEmail: {
    useCase: getUserByEmail,
    enable: true,
  },
  listAllUsers: {
    useCase: listAllUsers,
    enable: true,
  },
  listActiveUsers: {
    useCase: listActiveUsers,
    enable: true,
  },
  listStudents: {
    useCase: listStudents,
    enable: true,
  },
  deleteUser: {
    useCase: deleteUser,
    enable: true,
  },
  updatePayment: {
    useCase: updatePayment,
    enable: true,
  },
  listUserPayments: {
    useCase: listUserPayments,
    enable: true,
  },
  listBookingPayments: {
    useCase: listBookingPayments,
    enable: true,
  },
  createPayment: {
    useCase: createPayment,
    enable: true,
  },
  updateClass: {
    useCase: updateClass,
    enable: true,
  },
  listAvailableClasses: {
    useCase: listAvailableClasses,
    enable: true,
  },
  getClassDetails: {
    useCase: getClassDetails,
    enable: true,
  },
  getClassByTitle: {
    useCase: getClassByTitle,
    enable: true,
  },
  getClassByTeacher: {
    useCase: getClassByTeacher,
    enable: true,
  },
  getClassByStartDate: {
    useCase: getClassByStartDate,
    enable: true,
  },
  getClassByLocation: {
    useCase: getClassByLocation,
    enable: true,
  },
  createClass: {
    useCase: createClass,
    enable: true,
  },
  updateBooking: {
    useCase: updateBooking,
    enable: true,
  },
  listUserBookings: {
    useCase: listUserBookings,
    enable: true,
  },
  listClassBookings: {
    useCase: listClassBookings,
    enable: true,
  },
  createBooking: {
    useCase: createBooking,
    enable: true,
  },
  getBookingById: {
    useCase: getBookingById,
    enable: true,
  },
} as const satisfies Record<string, UseCaseDeclaration>;

export const USE_CASE_NAME = Object.keys(domainUseCases).reduce((acc, key) => {
  acc[key] = key;
  return acc;
}, {} as Record<string, string>) as Record<
  keyof typeof domainUseCases,
  keyof typeof domainUseCases
>;

export type UseCaseName = (typeof USE_CASE_NAME)[keyof typeof USE_CASE_NAME];

export type UseCaseType<TEndpointName extends UseCaseName> =
  (typeof domainUseCases)[TEndpointName]['useCase'];
