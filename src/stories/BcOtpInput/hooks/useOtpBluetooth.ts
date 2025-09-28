import { useCallback, useState, useEffect } from 'react';

// Bluetooth API Type Definitions
interface Bluetooth {
  requestDevice(options: BluetoothRequestDeviceOptions): Promise<BluetoothDevice>;
}

interface BluetoothRequestDeviceOptions {
  acceptAllDevices?: boolean;
  optionalServices?: string[];
}

interface BluetoothDevice {
  name?: string;
  gatt?: BluetoothRemoteGATTServer;
  addEventListener(type: string, listener: EventListener): void;
  removeEventListener(type: string, listener: EventListener): void;
}

interface BluetoothRemoteGATTServer {
  connect(): Promise<BluetoothRemoteGATTServer>;
  disconnect(): void;
  getPrimaryService(service: string): Promise<BluetoothRemoteGATTService>;
}

interface BluetoothRemoteGATTService {
  getCharacteristic(characteristic: string): Promise<BluetoothCharacteristic>;
}

interface BluetoothCharacteristic {
  value?: DataView;
  startNotifications(): Promise<BluetoothCharacteristic>;
  addEventListener(type: string, listener: EventListener): void;
  removeEventListener(type: string, listener: EventListener): void;
}

export interface UseOtpBluetoothProps {
  enableBluetooth?: boolean;
  onBluetoothMessage?: (message: string) => void;
  onBluetoothError?: (error: Error) => void;
  onBluetoothSuccess?: () => void;
  serviceUUID?: string;
  characteristicUUID?: string;
}

export interface BluetoothState {
  isSupported: boolean;
  isAvailable: boolean;
  isConnected: boolean;
  isScanning: boolean;
  isConnecting: boolean;
  error: string | null;
  lastMessage: string | null;
  deviceName: string | null;
}

export const useOtpBluetooth = ({
  enableBluetooth = false,
  onBluetoothMessage,
  onBluetoothError,
  onBluetoothSuccess,
  serviceUUID = '12345678-1234-1234-1234-123456789abc',
  characteristicUUID = '87654321-4321-4321-4321-cba987654321',
}: UseOtpBluetoothProps) => {
  const [state, setState] = useState<BluetoothState>({
    isSupported: false,
    isAvailable: false,
    isConnected: false,
    isScanning: false,
    isConnecting: false,
    error: null,
    lastMessage: null,
    deviceName: null,
  });

  // Check for Bluetooth support
  useEffect(() => {
    if (!enableBluetooth) return;

    const isSupported = 'bluetooth' in navigator;
    setState(prev => ({ ...prev, isSupported, isAvailable: isSupported }));
  }, [enableBluetooth]);

  // Scan for Bluetooth devices
  const scanForDevices = useCallback(async () => {
    if (!enableBluetooth || !state.isSupported || state.isScanning) return;

    try {
      setState(prev => ({ ...prev, isScanning: true, error: null }));

      const device = await (navigator as Navigator & { bluetooth: Bluetooth }).bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: [serviceUUID],
      });

      setState(prev => ({ 
        ...prev, 
        isScanning: false, 
        deviceName: device.name || 'Unknown Device' 
      }));

      return device;
    } catch (error) {
      const err = error as Error;
      setState(prev => ({ 
        ...prev, 
        error: err.message, 
        isScanning: false 
      }));
      onBluetoothError?.(err);
      return null;
    }
  }, [enableBluetooth, state.isSupported, state.isScanning, serviceUUID, onBluetoothError]);

  // Connect to Bluetooth device
  const connectToDevice = useCallback(async (device?: BluetoothDevice) => {
    if (!enableBluetooth || !state.isSupported || state.isConnecting) return;

    try {
      setState(prev => ({ ...prev, isConnecting: true, error: null }));

      const targetDevice = device || await scanForDevices();
      if (!targetDevice || !targetDevice.gatt) return;

      const server = await targetDevice.gatt.connect();
      const service = await server.getPrimaryService(serviceUUID);
      const characteristic = await service.getCharacteristic(characteristicUUID);

      // Listen for notifications
      await characteristic.startNotifications();
      characteristic.addEventListener('characteristicvaluechanged', (event: Event) => {
        const target = event.target as unknown as BluetoothCharacteristic;
        const value = target.value;
        if (value) {
          const message = new TextDecoder().decode(value);
          setState(prev => ({ ...prev, lastMessage: message }));
          onBluetoothMessage?.(message);
          onBluetoothSuccess?.();
        }
      });

      setState(prev => ({ 
        ...prev, 
        isConnected: true, 
        isConnecting: false 
      }));

      onBluetoothSuccess?.();

    } catch (error) {
      const err = error as Error;
      setState(prev => ({ 
        ...prev, 
        error: err.message, 
        isConnecting: false 
      }));
      onBluetoothError?.(err);
    }
  }, [enableBluetooth, state.isSupported, state.isConnecting, serviceUUID, characteristicUUID, scanForDevices, onBluetoothMessage, onBluetoothError, onBluetoothSuccess]);

  // Disconnect from Bluetooth device
  const disconnect = useCallback(() => {
    setState(prev => ({ 
      ...prev, 
      isConnected: false, 
      deviceName: null 
    }));
  }, []);

  // Send message via Bluetooth
  const sendMessage = useCallback(async (message: string) => {
    if (!enableBluetooth || !state.isConnected) return;

    try {
      // This would require storing the characteristic reference
      // In a real implementation, you'd need to manage the connection state
      console.log('Sending message via Bluetooth:', message);
    } catch (error) {
      const err = error as Error;
      setState(prev => ({ ...prev, error: err.message }));
      onBluetoothError?.(err);
    }
  }, [enableBluetooth, state.isConnected, onBluetoothError]);

  // Clear error
  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  // Get Bluetooth button props
  const getBluetoothButtonProps = useCallback(() => {
    if (!enableBluetooth || !state.isSupported) return null;

    return {
      'data-testid': 'bluetooth-button',
      'aria-label': state.isConnected ? 'Disconnect Bluetooth' : 'Connect Bluetooth',
      'disabled': !state.isAvailable || state.isConnecting,
      'title': state.isConnected ? 'Disconnect Bluetooth' : 'Connect Bluetooth',
    };
  }, [enableBluetooth, state.isSupported, state.isConnected, state.isAvailable, state.isConnecting]);

  // Get Bluetooth status
  const getBluetoothStatus = useCallback(() => {
    if (!enableBluetooth) return null;

    if (state.error) {
      return `Error: ${state.error}`;
    }

    if (state.isConnecting) {
      return 'Connecting to Bluetooth device...';
    }

    if (state.isScanning) {
      return 'Scanning for Bluetooth devices...';
    }

    if (state.isConnected) {
      return `Connected to ${state.deviceName || 'Bluetooth device'}`;
    }

    if (state.lastMessage) {
      return `Last message: ${state.lastMessage}`;
    }

    if (!state.isSupported) {
      return 'Bluetooth not supported';
    }

    return 'Bluetooth ready';
  }, [enableBluetooth, state.error, state.isConnecting, state.isScanning, state.isConnected, state.deviceName, state.lastMessage, state.isSupported]);

  return {
    ...state,
    scanForDevices,
    connectToDevice,
    disconnect,
    sendMessage,
    clearError,
    getBluetoothButtonProps,
    getBluetoothStatus,
  };
};
