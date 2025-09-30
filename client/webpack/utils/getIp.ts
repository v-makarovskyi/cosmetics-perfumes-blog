import os from "os";

function getIp() {
  const interfaces = os.networkInterfaces();
  const ip = Object.values(interfaces)
    .flat()
    .filter((val) => val?.family === "IPv4" && !val.internal)
    .map((el) => el?.address)
    .join('')

  return ip
}

