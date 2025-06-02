import React from "react";  
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet"; 
import "leaflet/dist/leaflet.css";
import CustomMarker from "../assets/icons/customMarker.svg";

const position: [number, number] = [50.37378760955146, 30.44781148042901]; // Киев

const customIcon = new L.Icon({
  iconUrl: CustomMarker, 
  iconSize: [50, 80], 
  iconAnchor: [20, 40], 
  popupAnchor: [0, -35], 
});

const Contacts: React.FC = () => {
  return (
    <div className="text-[#F0F0F0] mt-16 mx-auto w-[79.06%]">
      <p className="text-[#F2890F] text-sm font-medium pl-[6px]">
        квесты в Киеве
      </p>
      <h1 className="text-[64px] leading-[110%] font-extrabold mt-2 pl-[6px]">
        Контакты
      </h1>
      <hr className="border-t opacity-[0.25] border-[#E6E6E6] mt-[29px] mb-[47px]" />

      <div className="flex justify-between items-center">
        <div className="ml-[30px] flex flex-col gap-6 w-[22.59%]">
          <div>
            <p className="font-bold text-sm">Адрес</p>
            <p 
              style={{ fontVariantNumeric: "lining-nums proportional-nums" }}
              className="text-[15px] font-medium"
            >
              Киев, Кільцева дорога, 1, Київ, Україна, 02000
            </p>
          </div>
          <div>
            <p className="font-bold text-sm">Режим работы</p>
            <p 
              style={{ fontVariantNumeric: "lining-nums proportional-nums" }}
              className="text-[15px] font-medium"
            >Ежедневно, с 9:00 до 20:00</p>
          </div>
          <div>
            <p className="font-bold text-sm">Телефон</p>
            <p 
              style={{ fontVariantNumeric: "lining-nums proportional-nums" }}
              className="text-[15px] font-medium"
            >8 (800) 333-55-99</p>
          </div>
          <div>
            <p className="font-bold text-sm">E-mail</p>
            <p className="text-[15px] font-medium">info@escape-room.ua</p>
          </div>
        </div>

        <div className="h-[336px] w-[60.09%] overflow-hidden">
          <MapContainer
            center={position}
            zoom={16}
            scrollWheelZoom={false}
            className="w-full h-full"
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={position} icon={customIcon}>
              <Popup>
                <div className="text-sm font-medium text-center p-2">
                  📍 Киев, Кільцева дорога, 1
                </div>
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default Contacts;