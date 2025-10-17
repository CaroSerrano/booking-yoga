import { ClassDeps } from "./createClass";

interface GetByLocationPayload {
    location: string;
}

export async function getByLocation({classService}: ClassDeps, {location}: GetByLocationPayload) {
    const classes = await classService.findByLocation(location);
    return classes;
}