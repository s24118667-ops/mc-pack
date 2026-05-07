import { world } from "@minecraft/server";

const CASING = "createb:andesite_casing";
const COGWHEEL = "createb:cogwheel";
const WRENCH = "createb:wrench";
const CONTROLLER = "createb:propeller_controller";

world.afterEvents.itemUseOn.subscribe((event) => {
  const player = event.source;
  const item = event.itemStack;
  const block = event.block;

  if (!item || !block) return;

  if (item.typeId === COGWHEEL && block.typeId === CASING) {
    const perm = block.permutation;
    const isPowered = perm.getState("createb:powered") === true;
    block.setPermutation(perm.withState("createb:powered", !isPowered));
    player.sendMessage(`§6[CreateB]§r Casing ${!isPowered ? "§aspinning" : "§cstopped"}§r.`);
    return;
  }

  if (item.typeId === WRENCH) {
    player.sendMessage(`§b[CreateB]§r Wrench configured ${block.typeId} (placeholder action).`);
    return;
  }

  if (item.typeId === CONTROLLER) {
    player.sendMessage("§d[CreateB]§r Propeller controller primed. Airship assembly hooks coming next.");
  }
});
