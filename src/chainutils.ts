import { ethers } from "ethers";

const getProvider = () => {
    return new ethers.providers.JsonRpcProvider(process.env.PROVIDER_URL);
}

const getVoidSigner = () => {
    return new ethers.VoidSigner(process.env.DEFAULT_SIGNER || '', getProvider());
}  

export { getProvider, getVoidSigner };