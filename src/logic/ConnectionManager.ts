import { MultiMap } from "@/logic/utils/MultiMap";
export interface Conn {
    id: number;
    idx: number;
    legal: boolean;
};
export type PinMap = MultiMap<number, Conn>;   // 每个引脚对应的接线情况。同个引脚，可以接多条线


export class ConnectionManager {
    // 即Map<id:number, PinMap>
    // 即connections存储的是每个元件的输出端口与其他元件输入端口的连线关系
    connections: Map<number, PinMap>;
    reverseConnections: Map<number, PinMap>; // 反向连线关系，便于根据输入端口查输出端口
    constructor() {
        this.connections = new Map<number, PinMap>(); // 存储连线关系
        this.reverseConnections = new Map<number, PinMap>();
    }

    // 添加连线
    addConnection(id1: number, idx1: number, id2: number, idx2: number, legal: boolean): boolean {
        if (!this.connections.has(id1)) {
            this.connections.set(id1, new MultiMap());
        }
        this.connections.get(id1)!.add(idx1, { id: id2, idx: idx2, legal: legal });
        if (!this.reverseConnections.has(id2)) {
            this.reverseConnections.set(id2, new MultiMap());
        }
        this.reverseConnections.get(id2)!.add(idx2, { id: id1, idx: idx1, legal: legal });
        return true;
    }

    // 删除连线
    removeConnection(inputId: number, inputIdx: number, outputId: number, outputIdx: number) {
        const pinMap = this.connections.get(inputId);
        if(pinMap){
            // 删除指定引脚的连线
            for(const conn of pinMap.get(inputIdx) || []) {
                if (conn.id === outputId && conn.idx === outputIdx) {
                    pinMap.remove(inputIdx, conn);
                }
            }
        }
        const reversePinMap = this.reverseConnections.get(outputId);
        if(reversePinMap){
            // 删除反向连线
            for(const conn of reversePinMap.get(outputIdx) || []) {
                if (conn.id === inputId && conn.idx === inputIdx) {
                    reversePinMap.remove(outputIdx, conn);
                }
            }
        }
    }

    removeComponentConnections(id: number) {
        // 删除与某个组件相关的所有连线
        // 删除正向连线
        if (this.connections.has(id)) {
            const pinMap = this.connections.get(id);
            if(pinMap){
                // 删除其在反向连线中的所有连接
                for (const pinIdx of pinMap.keys()) {
                    for (const conn of pinMap.get(pinIdx) || []) {
                        const reversePinMap = this.reverseConnections.get(conn.id);
                        if (reversePinMap) {
                            reversePinMap.remove(conn.idx, { id: id, idx: pinIdx, legal: conn.legal });
                        }
                    }
                }
            }
            this.connections.delete(id);
        }
        // 删除反向连线
        if (this.reverseConnections.has(id)) {
            const pinMap = this.reverseConnections.get(id);
            if(pinMap){
                // 删除其在正向连线中的所有连接
                for (const pinIdx of pinMap.keys()) {
                    for (const conn of pinMap.get(pinIdx) || []) {
                        const forwardPinMap = this.connections.get(conn.id);
                        if (forwardPinMap) {
                            forwardPinMap.remove(conn.idx, { id: id, idx: pinIdx, legal: conn.legal });
                        }
                    }
                }
            }
            this.reverseConnections.delete(id);
        }
    }

    // 获取与某组件的输出端的pinMap
    getOutputPinMap(id: number): PinMap | undefined{
        return this.connections.get(id);
    }

    // 获取与某组件的输入端的pinMap
    getInputPinMap(id: number): PinMap | undefined {
        return this.reverseConnections.get(id);
    }
}