export interface IServiceProvider {
  id: number;
  providerName: string;
  description: string;
  imageUrl: string;
  rating: number;
}

export interface IServiceProviderListProps {
  providers: IServiceProvider[];
}

export interface IProviderCardProps {
  providerName: string;
  description: string;
  imageUrl: string;
  rating: number;
}
