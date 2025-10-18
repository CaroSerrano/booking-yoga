import { ClassDeps } from "./createClass";

interface GetByLocationPayload {
    location: string;
}

export async function getClassByLocation({classService}: ClassDeps, {location}: GetByLocationPayload) {
    const classes = await classService.findByLocation(location);
    return classes;
}