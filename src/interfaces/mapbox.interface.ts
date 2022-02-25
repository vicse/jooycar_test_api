export interface MapBoxApiResponse {
    type: string,
    query: number[],
    features: AddressResponse[]
}

interface AddressResponse {
    id: string,
    type: string,
    place_type: string[],
    relevance: number,
    text: string,
    place_name: string,
    center: number[],
    address: string
}