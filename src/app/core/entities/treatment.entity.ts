export interface Treatment {
    idTreatment: number;
    treatmentName: string;
    treatmentType: string;
    description: string;
    cost: number;  // Usamos 'number' para BigDecimal
  }
  