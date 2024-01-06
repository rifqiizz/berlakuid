import { CategoryList } from "@/components/category/CategoryList";
import { apiUrl } from "@/config/apiUrl";
import React from "react";
import parse from 'html-react-parser';

async function getData() {
  const res = await fetch(`${apiUrl}/categories`,{
    cache: "no-store"
  });
  const data = res.json();
  //console.log(data);
  
    // let iconSelection = null;
    // switch(key.name) {
    //   case 'Event':
    //     iconSelection = '<PartyPopper size={16} />';
    //     break;
    //   case 'Otomotif':
    //     iconSelection = '<Car size={16} />';
    //     break;
    //   case 'Dokumen':
    //     iconSelection = '<FileText size={16} />';
    //     break;
    //   case 'Website':
    //     iconSelection = '<PanelTop size={16} />';
    //     break;
    //   case 'Barang':
    //     iconSelection = '<Package2 size={16} />';
    //     break;
    //   case 'Pembayaran':
    //     iconSelection = '<Banknote size={16} />';
    //     break;
    //   case 'Properti':
    //     iconSelection = '<Home size={16} />';
    //     break;
    //   case 'Software':
    //     iconSelection = '<Computer size={16} />';
    //     break;
    //   default:
    //     iconSelection = '';
    // }
    //data['icon'] = iconSelection;
    //const [key, 'icon'] = iconSelection;
    //element.icon = iconSelection;
 // });
  
  //console.log(data);
  return data;
}


export default async function Page() {
  const { data } = await getData();
  //console.log('kategori: ', data);
  //const parsedIcon = parse({data['icon']});
  
  return (
    <main className="space-y-8">
    <section>
      <h2>Kategori</h2>
      <p>Berikut ini daftar kategori pengingat yang bisa kamu pilih</p>
    </section>
    <section className="">
    <div className="grid grid-cols-2 gap-6">
      {data.map(({ id, name, desc, icon }) => {
        return (
          <div key={id}>
            <CategoryList name={name} desc={desc} icon={icon}/>
          </div>
        );
      })}
      </div>
      </section>
    </main>
  );
}