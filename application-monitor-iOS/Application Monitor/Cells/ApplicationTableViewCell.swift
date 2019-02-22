//
//  ApplicationTableViewCell.swift
//  Application Monitor
//
//  Created by Teresa Bocchini on 2/23/18.
//  Copyright © 2018 Teresa Bocchini. All rights reserved.
//

import UIKit

class ApplicationTableViewCell: UITableViewCell {
    //MARK: Properties
    @IBOutlet weak var nameLabel: UILabel!
    @IBOutlet weak var photoImage: UIImageView!
    @IBOutlet weak var platfromImage: UIImageView!
    
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }

    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }
}
