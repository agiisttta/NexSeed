const mongoose = require("mongoose");

const lkpdSchema = new mongoose.Schema({

    user:{

        type:mongoose.Schema.Types.ObjectId,

        ref:"User",

        required:true

    },

    identitas:{

        nama:String,

        kelas:String,

        kelompok:String,

        tanggal:Date

    },

    rumusanMasalah:{

        rumusan1:String,

        rumusan2:String,

        rumusan3:String

    },

    hipotesis:{

        hipotesis1:String,

        hipotesis2:String,

        hipotesis3:String

    },

    tabelPengamatan:[{

        percobaan:Number,

        air:String,

        suhu:String,

        cahaya:String,

        hasil:String

    }],

    strukturBiji:{

        A:String,

        B:String,

        C:String,

        D:String

    },

    fungsiStruktur:{

        namaA:String,
        fungsiA:String,

        namaB:String,
        fungsiB:String,

        namaC:String,
        fungsiC:String,

        namaD:String,
        fungsiD:String

    },

    halMenarik:String,

    analisis:{

        analisis1:String,

        analisis2:String,

        analisis3:String

    },

    kesimpulan:String,

    status:{

        type:String,

        default:"draft"

    }

},{
    timestamps:true
});

module.exports = mongoose.model("Lkpd", lkpdSchema);