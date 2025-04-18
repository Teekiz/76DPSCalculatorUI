import ApiClient from "./ApiClient";
import {Mutation} from "../interfaces/MutationInterface";

const client = ApiClient();

export const getAllMutations = async (): Promise <Mutation[]> => {
    try {
        const mutationData = (await client.get<Mutation[]>('/loadouts/getAvailableMutations')).data;
        if (Array.isArray(mutationData))
        {
            console.debug('Retrieved mutation data (getAllMutations):', mutationData)
            return mutationData;
        } else {
            console.error('Error fetching mutations: expected array but received: ', mutationData);
            return [];
        }
    } catch (error) {
        console.error('Error fetching mutations:', error);
        return [];
    }
}

export const addMutation = async (loadoutID: number, mutation: Mutation): Promise<void> => {
    try {
        await client.post(`/loadouts/addMutation?loadoutID=${loadoutID}&mutationID=${mutation.id}`);
    } catch (error){
        console.error('Error adding mutation:', error);
    }
}

export const removeMutation = async (loadoutID: number, mutation: Mutation): Promise<void> => {
    try {
        await client.post(`/loadouts/removeMutation?loadoutID=${loadoutID}&mutationID=${mutation.id}`);
        console.log("Removed mutation: ", mutation.name);
    } catch (error){
        console.error('Error adding mutation:', error);
    }
}