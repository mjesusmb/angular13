export interface ExportacioPdfHeaderCell {
    title: string;
    dataKey: string;
}

export interface ExportacioPdfBodyCellBase {
    cellColorStyle: [number, number, number];
    cellColorField: string;
}
