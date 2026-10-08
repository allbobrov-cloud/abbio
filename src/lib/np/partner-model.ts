/*
 * Модель данных регионального партнёра — основа для будущего личного кабинета.
 * Сейчас это только описание типов: данные партнёров не хранятся на сайте
 * и не попадают в браузер. Хранилище и доступ к кабинету — отдельная задача
 * (вероятно, PostgreSQL сайта, отдельная схема), согласуется с владельцем.
 */

import type { CityStatus } from "./content";

export type PartnerContact = {
  phones: string[];
  messengers: { type: "telegram" | "whatsapp" | "max" | "other"; value: string }[];
  email?: string;
};

export type PartnerCompany = {
  name: string;
  legal: { form: "ООО" | "ИП" | "другое"; fullName: string; inn: string; ogrn?: string };
  address: string;
  workingHours: string;
  executor: string;
};

export type PartnerPortfolioItem = { title: string; image: string; room?: string; areaM2?: number; date?: string };

export type PartnerTariff = {
  stage: 1 | 2 | 3 | 4;
  monthlyPrice: number;
  connectedAt: string;
  nextReviewAt: string;
  kpi: { name: string; target: string; actual?: string }[];
};

export type RegionPartner = {
  regionSlug: string;
  city: string;
  siteHost: string;
  status: CityStatus;
  company: PartnerCompany;
  contact: PartnerContact;
  portfolio: PartnerPortfolioItem[];
  reviews: { author: string; text: string; source: string; verified: boolean }[];
  tariff: PartnerTariff;
};
