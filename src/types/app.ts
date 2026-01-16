import type { RemixiconComponentType } from "@remixicon/react";

export type Maybe<T> = T | null;

export type Undefined<T> = T | undefined;

export type Nullable<T> = T | null | undefined;

export type MaybePromise<T> = T | PromiseLike<T>;

export type MaybePromiseOrNull<T> = MaybePromise<Nullable<T>>;

export type RouteProps = {
  href: string;
  icon: RemixiconComponentType;
  label: string;
};

export interface HttpError {
  message: string;
  status: number;
}

export interface HttpResponse<T> {
  data: T;
  message: string;
  status: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface PaginationParams {
  page: number;
  size: number;
}
