import { UUID } from "../modules/utils/UUID"
import { Filters } from "./MiscTypes";

interface ServiceProperties {
    name: string,
    description?: string,
    mesureUnit: MesureUnits,
    value: number,
    type: ServiceTypes,
    errorMargin: number,
}

interface ServiceUpdate {
    name?: string;
    description?: string;
    mesureUnit?: MesureUnits;
    value?: number;
    type?: ServiceTypes;
    errorMargin?: number;
}

interface ServiceData extends ServiceProperties {
    id: UUID,
    companyid: UUID,
    mesureunit: MesureUnits,
    errormargin: number,
    createdby: UUID,
    createdat: Date,
    updatedat: Date
}

interface ServiceEntity extends ServiceProperties {
    id: UUID,
    companyId: UUID,
    createdBy: UUID,
    createdAt: Date,
    updatedAt: Date
}

const processService = (data: ServiceData): ServiceEntity => ({
    id: data.id,
    name: data.name,
    description: data.description,
    mesureUnit: data.mesureunit,
    value: data.value,
    type: data.type,
    errorMargin: data.errormargin,
    createdBy: data.createdby,
    companyId: data.companyid,
    createdAt: data.createdat,
    updatedAt: data.updatedat
});

const ServiceProps: (keyof ServiceProperties)[] = ["name", "description", "mesureUnit", "value", "type", "errorMargin"]

enum MesureUnits {
    METER = 'm',
    SQUARE_METER = 'm2',
    CUBIC_METER = 'm3',
    MILILITER = 'ml',
    LITER = 'l',
    HOUR = 'hour',
    DAY = 'day',
    WEEK = 'week',
    MONTH = 'month'
}

enum ServiceTypes {
    SERVICE = 'service',
    GOOD = 'good'
}

interface ServiceFilters extends Filters {
    name?: String,
    type?: ServiceTypes,
}

const ServiceFilterProps: (keyof ServiceFilters)[] = ["name", "type"];

export {
    ServiceProperties,
    ServiceUpdate,
    ServiceData,
    ServiceEntity,
    ServiceProps,
    processService,
    MesureUnits,
    ServiceTypes,
    ServiceFilters,
    ServiceFilterProps
}
