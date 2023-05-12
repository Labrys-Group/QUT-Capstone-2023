// components/QRCodeGenerator.js
import React from "react";
import QRCode from "qrcode.react";

export type QRCodeGeneratorProps = {
  uniqueId: string;
};

const QRCodeGenerator = ({ uniqueId }: QRCodeGeneratorProps) => {
  return (
    <div>
      <QRCode value={uniqueId} />
    </div>
  );
};

export default QRCodeGenerator;
